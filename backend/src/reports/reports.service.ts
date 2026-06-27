import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
  ) {}

  private calculateScore(category: string, description: string): number {
    let score = 0;

    if (category === 'safety') score += 40;
    else if (category === 'water') score += 35;
    else if (category === 'flood') score += 35;
    else if (category === 'road') score += 25;
    else if (category === 'sanitation') score += 20;
    else score += 15;

    const urgentWords = [
      'emergency',
      'urgent',
      'critical',
      'dangerous',
      'broken',
      'no water',
      'flood',
    ];
    urgentWords.forEach((w) => {
      if (description?.toLowerCase().includes(w)) score += 10;
    });

    if (score >= 70) return Math.min(score, 100);
    return Math.min(score, 100);
  }

  private getPriority(score: number): string {
    if (score >= 70) return 'Critical';
    if (score >= 45) return 'High';
    if (score >= 25) return 'Medium';
    return 'Low';
  }

  async create(data: Partial<Report>): Promise<Report> {
    const report = this.reportsRepository.create(data);
    report.score = this.calculateScore(report.category, report.description);
    report.priority = this.getPriority(report.score);
    return this.reportsRepository.save(report);
  }

  async findAll(): Promise<Report[]> {
    return this.reportsRepository.find({ order: { score: 'DESC' } });
  }

  async findOne(id: number): Promise<Report | null> {
    return this.reportsRepository.findOne({ where: { id } });
  }

  async updateStatus(id: number, status: string): Promise<Report | null> {
    await this.reportsRepository.update(id, { status });
    return this.findOne(id);
  }

  async upvote(id: number): Promise<Report | null> {
    const report = await this.findOne(id);
    if (!report) return null;
    report.votes += 1;
    const newScore = Math.min(report.score + 2, 100);
    report.score = newScore;
    report.priority = this.getPriority(newScore);
    return this.reportsRepository.save(report);
  }

  async getStats() {
    const all = await this.findAll();
    return {
      total: all.length,
      pending: all.filter((r) => r.status === 'Pending').length,
      inProgress: all.filter((r) => r.status === 'In Progress').length,
      resolved: all.filter((r) => r.status === 'Resolved').length,
      critical: all.filter((r) => r.priority === 'Critical').length,
    };
  }
}
