import { Controller, Get, Post, Patch, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Report } from './report.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Post()
    create(@Body() body: Partial<Report>) {
        return this.reportsService.create(body);
    }

    @Get()
    findAll() {
        return this.reportsService.findAll();
    }

    @Get('stats')
    getStats() {
        return this.reportsService.getStats();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.reportsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/status')
    updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status') status: string,
    ) {
        return this.reportsService.updateStatus(id, status);
    }

    @Patch(':id/upvote')
    upvote(@Param('id', ParseIntPipe) id: number) {
        return this.reportsService.upvote(id);
    }
}